# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **BREAKING**: Elements with `ref` are now automatically converted to lifecycle elements (custom elements)
- Refs are automatically cleaned (set to `null`) when the element is unmounted from the DOM
- The ref cleanup occurs before any `onmount` cleanup functions and before the `onunmount` callback

### Added
- Automatic ref cleanup in lifecycle elements to prevent memory leaks
- New tests for ref cleanup behavior in `base.test.ts` and `lifecycle-cleanup.test.ts`

### Fixed
- Improved error handling in `onunmount` to properly catch synchronous errors
- Fixed type safety issues in form debounce timer cleanup
- Fixed type narrowing in router parameter extraction

### Migration Guide
- Existing code using refs continues to work without changes
- If your code depended on `ref.current` maintaining its value after the element is unmounted, you'll need to store the reference separately before unmount
- Elements with only a `ref` property (no `onmount` or `onunmount`) now use custom elements, which has a small performance overhead

## [4.0.1] - Previous Release

(Previous changelog entries would go here)
