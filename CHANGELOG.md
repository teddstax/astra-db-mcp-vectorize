# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-03-19

### Added

- Bulk operations support for AI agents
  - Ability to perform bulk create, update, and delete operations in a single shot
  - Optimized performance for large-scale data operations (e.g., inserting 1000s of records)
- Improved onboarding experience
  - Added interactive browser-based authentication flow
  - Automatic guidance through Astra DB signup process when credentials are missing
  - Better error handling and user feedback
- Enhanced documentation
  - Added Windows PowerShell-specific instructions
  - Updated available tools documentation

### Changed

- Switched to Apache-2.0 license
- Improved error handling for authentication failures
- Enhanced user guidance during setup process

### Credits

- Thanks to @philnash for Apache-2.0 license contribution
- Thanks to @mieslep for Windows PowerShell documentation improvements
