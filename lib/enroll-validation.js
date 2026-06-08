/**
 * enroll-validation.js
 * Server-side validation + sanitization for student enrollment.
 * Import this in /api/register-student/route.js
 */

// ─────────────────────────────────────────────
// 1. SANITIZATION
// ─────────────────────────────────────────────

/**
 * Strip every HTML tag, null bytes, and control characters.
 * Encode the five HTML-special chars so they can never be
 * reflected as markup anywhere downstream.
 */
function sanitizeString(raw) {
  if (typeof raw !== "string") return "";

  return (
    raw
      // null bytes
      .replace(/\0/g, "")
      // HTML tags (including SVG / script payloads)
      .replace(/<[^>]*>/g, "")
      // Encode the five HTML-special chars
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Control characters (except \t \n \r)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      .trim()
  );
}

/**
 * Digits-only sanitizer for phone / PIN fields.
 */
function sanitizeDigits(raw) {
  if (typeof raw !== "string") return "";
  return raw.replace(/\D/g, "").trim();
}

// ─────────────────────────────────────────────
// 2. ATTACK-PATTERN DETECTION
// ─────────────────────────────────────────────

const ATTACK_PATTERNS = [
  // SQL injection keywords
  /(\b)(select|insert|update|delete|drop|truncate|alter|create|exec|execute|union|declare|cast|convert|xp_)\b/i,
  // Common SQLi punctuation sequences
  /(['";])\s*(--|#|\/\*)/,
  /\b(or|and)\b\s+\d+\s*=\s*\d+/i,
  // Script / event-handler injection
  /<\s*script/i,
  /javascript\s*:/i,
  /on\w+\s*=/i, // onclick=, onerror=, etc.
  /data\s*:\s*text\/html/i,
  // Path traversal
  /\.\.(\/|\\)/,
  // Template injection
  /\{\{.*\}\}/,
  /\$\{.*\}/,
  // LDAP / XPath injection starters
  /[)(|&!*]/,
];

/**
 * Returns true if the value looks like an attack payload.
 */
function looksLikeAttack(value) {
  if (typeof value !== "string") return false;
  return ATTACK_PATTERNS.some((re) => re.test(value));
}

// ─────────────────────────────────────────────
// 3. FAKE / GARBAGE DETECTION
// ─────────────────────────────────────────────

const GARBAGE_NAMES = [
  /^(test|fake|dummy|asdf|qwerty|abc|xyz|aaa|bbb|xxx|null|undefined|none|na|n\/a)$/i,
  /^(.)\1{4,}$/, // aaaaaaa, 1111111
  /^[^a-zA-Z\u0600-\u06FF\u0900-\u097F\s]+$/, // purely symbols / numbers
];

function looksLikeFakeName(value) {
  if (typeof value !== "string") return false;
  return GARBAGE_NAMES.some((re) => re.test(value.trim()));
}

// ─────────────────────────────────────────────
// 4. FIELD-LEVEL VALIDATORS
// ─────────────────────────────────────────────

function validateName(raw, fieldLabel) {
  const v = sanitizeString(raw);
  if (!v) return `${fieldLabel} is required`;
  if (v.length < 2) return `${fieldLabel} must be at least 2 characters`;
  if (v.length > 100) return `${fieldLabel} must be under 100 characters`;
  if (looksLikeAttack(raw)) return `${fieldLabel} contains invalid characters`;
  if (looksLikeFakeName(v))
    return `Please enter a real ${fieldLabel.toLowerCase()}`;
  if (!/^[\p{L}\s''\-\.]+$/u.test(v))
    return `${fieldLabel} may only contain letters, spaces, hyphens, and apostrophes`;
  return null;
}

function validatePhone(raw, required = true) {
  const v = sanitizeDigits(raw);
  if (!v) return required ? "Phone number is required" : null;
  if (!/^[6-9]\d{9}$/.test(v))
    return "Enter a valid 10-digit Indian mobile number";
  return null;
}

function validateEmail(raw, required = false) {
  const v = sanitizeString(raw);
  if (!v) return required ? "Email address is required" : null;
  if (looksLikeAttack(raw)) return "Email contains invalid characters";
  if (!/^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(v))
    return "Enter a valid email address";
  return null;
}

function validateDob(raw) {
  if (!raw) return "Date of birth is required";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "Enter a valid date of birth";
  const now = new Date();
  const age = now.getFullYear() - d.getFullYear();
  if (d > now) return "Date of birth cannot be in the future";
  if (age > 18) return "Student must be 18 years old or younger";
  if (age < 3) return "Student must be at least 3 years old";
  return null;
}

function validateAge(raw) {
  const n = Number(raw);
  if (isNaN(n) || !Number.isInteger(n)) return "Age must be a whole number";
  if (n < 3 || n > 18) return "Age must be between 3 and 18";
  return null;
}

function validateGender(raw) {
  const allowed = ["male", "female", "other"];
  if (!raw || !allowed.includes(raw.toLowerCase()))
    return "Please select a gender";
  return null;
}

function validatePinCode(raw) {
  const v = sanitizeDigits(raw);
  if (!v) return "PIN code is required";
  if (!/^\d{6}$/.test(v)) return "Enter a valid 6-digit PIN code";
  return null;
}

function validateState(raw, validStates) {
  const v = sanitizeString(raw);
  if (!v) return "State is required";
  if (!validStates.includes(v)) return "Select a valid Indian state";
  return null;
}

function validateGuardianRelation(raw) {
  const allowed = ["father", "mother", "other"];
  if (!raw || !allowed.includes(raw.toLowerCase()))
    return "Select a valid guardian relationship";
  return null;
}

function validateText(raw, fieldLabel, opts = {}) {
  const { required = false, maxLen = 150 } = opts;
  const v = sanitizeString(raw);
  if (!v) return required ? `${fieldLabel} is required` : null;
  if (looksLikeAttack(raw)) return `${fieldLabel} contains invalid characters`;
  if (v.length > maxLen)
    return `${fieldLabel} must be under ${maxLen} characters`;
  return null;
}

// ─────────────────────────────────────────────
// 5. FULL PAYLOAD VALIDATOR (call in API route)
// ─────────────────────────────────────────────

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/**
 * Validates and sanitizes the full enrollment payload.
 *
 * @param {object} body — raw req.json() body
 * @returns {{ errors: object, clean: object, suspicious: boolean }}
 */
export function validateEnrollmentPayload(body) {
  const errors = {};
  let suspicious = false;


  // ── Attack scan on entire payload ───────────────
  for (const [key, val] of Object.entries(body)) {
    if (typeof val === "string" && looksLikeAttack(val)) {
      suspicious = true;
      errors[key] = "Invalid characters detected";
    }
  }
  if (suspicious) return { errors, clean: {}, suspicious: true };

  // ── Individual field validation ─────────────────
  const nameErr = validateName(body.studentName, "Student name");
  if (nameErr) errors.studentName = nameErr;

  const dobErr = validateDob(body.dob);
  if (dobErr) errors.dob = dobErr;

  const ageErr = validateAge(body.age);
  if (ageErr) errors.age = ageErr;

  const genderErr = validateGender(body.gender);
  if (genderErr) errors.gender = genderErr;

  const fatherErr = validateName(body.fatherName, "Father's name");
  if (fatherErr) errors.fatherName = fatherErr;

  const motherErr = validateName(body.motherName, "Mother's name");
  if (motherErr) errors.motherName = motherErr;

  const occErr = validateText(body.guardianOccupation, "Occupation", {
    maxLen: 100,
  });
  if (occErr) errors.guardianOccupation = occErr;

  const phoneErr = validatePhone(body.phone, true);
  if (phoneErr) errors.phone = phoneErr;

  const altPhoneErr = validatePhone(body.alternatePhone, false);
  if (altPhoneErr) errors.alternatePhone = altPhoneErr;

  const emergErr = validatePhone(body.emergencyContact, false);
  if (emergErr) errors.emergencyContact = emergErr;

  const emailErr = validateEmail(body.email, false);
  if (emailErr) errors.email = emailErr;

  const relErr = validateGuardianRelation(body.guardianRelation);
  if (relErr) errors.guardianRelation = relErr;

  const guardNameErr = validateName(body.guardianName, "Guardian name");
  if (guardNameErr) errors.guardianName = guardNameErr;

  const guardEmailErr = validateEmail(body.guardianEmail, false);
  if (guardEmailErr) errors.guardianEmail = guardEmailErr;

  // Address
  const hnErr = validateText(body.address?.houseNumber, "House number", {
    required: true,
    maxLen: 150,
  });
  if (hnErr) errors.houseNumber = hnErr;

  const villErr = validateText(body.address?.village, "Village / locality", {
    required: true,
    maxLen: 150,
  });
  if (villErr) errors.village = villErr;

  const cityErr = validateText(body.address?.city, "City", {
    required: true,
    maxLen: 100,
  });
  if (cityErr) errors.city = cityErr;

  const pinErr = validatePinCode(body.address?.pinCode);
  if (pinErr) errors.pinCode = pinErr;

  const stateErr = validateState(body.address?.state, INDIAN_STATES);
  if (stateErr) errors.state = stateErr;

  // ── Build sanitized clean object ────────────────
  const clean = {
    studentName: sanitizeString(body.studentName),
    dob: sanitizeString(body.dob),
    age: Number(body.age),
    gender: sanitizeString(body.gender).toLowerCase(),
    fatherName: sanitizeString(body.fatherName),
    motherName: sanitizeString(body.motherName),
    guardianOccupation: sanitizeString(body.guardianOccupation),
    phone: sanitizeDigits(body.phone),
    alternatePhone: sanitizeDigits(body.alternatePhone),
    emergencyContact: sanitizeDigits(body.emergencyContact),
    email: sanitizeString(body.email).toLowerCase(),
    guardianRelation: sanitizeString(body.guardianRelation).toLowerCase(),
    guardianName: sanitizeString(body.guardianName),
    guardianEmail: sanitizeString(body.guardianEmail).toLowerCase(),
    photoUrl: sanitizeString(body.photoUrl),
    address: {
      houseNumber: sanitizeString(body.address?.houseNumber),
      village: sanitizeString(body.address?.village),
      city: sanitizeString(body.address?.city),
      state: sanitizeString(body.address?.state),
      pinCode: sanitizeDigits(body.address?.pinCode),
    },
  };

  return { errors, clean, suspicious: false };
}

// ─────────────────────────────────────────────
// 6. EXPORT INDIVIDUAL HELPERS (for custom use)
// ─────────────────────────────────────────────
export {
  sanitizeString,
  sanitizeDigits,
  looksLikeAttack,
  looksLikeFakeName,
  validateName,
  validatePhone,
  validateEmail,
  validateDob,
  validateAge,
  validateGender,
  validatePinCode,
  validateText,
};
