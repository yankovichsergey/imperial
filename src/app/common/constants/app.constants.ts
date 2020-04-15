export const PATTERN_EMAIL = '^(([^<>()\\\(а-яА-Я)\\\[\\\]\\\\\.,;:\\\s@"]+(\\\.[^<>()\\\[\\\]\\\\\.,;:\\\s@"]+)*)|(".+"))@[a-zA-Z0-9]([\\\w\\\.-]*[a-zA-Z0-9])?\\\.[a-zA-Z][a-z\\\.]*[a-zA-Z]$';
export const PATTERN_PASSWORD = '^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$';
export const RESPONSIVE_CONFIG = {
  breakPoints: {
    xs: { max: 544 },
    sm: { min: 545, max: 992 },
    md: { min: 993, max: 1299 },
    lg: { min: 1300, max: 1919 },
    xl: { min: 1920 }
  },
  debounceTime: 100
};
