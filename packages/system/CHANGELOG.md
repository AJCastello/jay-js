# Changelog

All notable changes to the @jay-js/system package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added `replace` option to render function that allows replacing the target element itself using `replaceWith`
- Support for array content when using `replace` option with document fragment for multiple elements

### Changed
- Enhanced render function to support element replacement in addition to content insertion
- **BREAKING CHANGE**: Changed `onSubmit` callback parameter order in useForm - data is now the first parameter, event is second: `(data, event) => void`
- **BREAKING CHANGE**: Changed `beforeChange` callback parameter order in register options - value is now the first parameter, event is second: `(value, event) => string | undefined`

## Previous releases
- See GitHub releases for historical changes