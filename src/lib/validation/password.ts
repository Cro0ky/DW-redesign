export const PASSWORD_ALLOWED_CHARS_REGEX =
  /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':",.<>/?\\|`~]*$/;

export const PASSWORD_INVALID_CHARS_REGEX =
  /[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':",.<>/?\\|`~]/g;

export const PASSWORD_HAS_LATIN_LETTER_REGEX = /[A-Za-z]/;

export const PASSWORD_HAS_SPECIAL_SYMBOL_REGEX =
  /[!@#$%^&*()_+\-=\[\]{};':",.<>/?\\|`~]/;

export const sanitizePasswordInput = (value: string): string =>
  value.replace(PASSWORD_INVALID_CHARS_REGEX, "");

export const hasInvalidPasswordChars = (value: string): boolean =>
  sanitizePasswordInput(value) !== value;
