export const LABEL_COLORS = {
  RED: [
    "UNKNOWN",
    "WRONG_AUTH",
    "PAYMENT_REQUIRED",
    "CANCELED",
    "RESTRICTED",
    "TWO_FACTOR_AUTH",
    "INVALID_SUBSCRIPTION",
  ],
  YELLOW: ["CREATED"],
  BLUE: ["PIN_REQUESTED", "CAPTCHA_REQUESTED"],
  GREEN: ["AUTH_OK"],
  GRAY: ["OFFLINE"],
}

export const LABEL_DESCRIPTION = {
  UNKNOWN: "Unknown",
  CREATED: "Checking auth",
  WRONG_AUTH: "Wrong auth",
  PIN_REQUESTED: "Pin required",
  CAPTCHA_REQUESTED: "Captcha",
  AUTH_OK: "Active",
  OFFLINE: "Offline",
  PAYMENT_REQUIRED: "Payment needed",
  CANCELED: "Canceled",
  RESTRICTED: "Restricted",
  TWO_FACTOR_AUTH: "Two Factor",
  INVALID_SUBSCRIPTION: "Invalid Subscription",
}

export const RESTRICTED_STATUS_IDS = [1, 2, 3, 7, 10, 11]

export const ACCOUNT_SELECT_OPTIONS = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
]

export const BASIC_LABEL_NAMES = [
  "UNKNOWN",
  "CREATED",
  "CAPTCHA_REQUESTED",
  "AUTH_OK",
  "OFFLINE",
  "CANCELED",
]

export const ACTIVE_STATUS_IDS = [5, 4]
