---
name: code-review
description: Review code for correctness, security, and maintainability following repo conventions. Use when the user requests a code review, asks you to review specific files, mentions reviewing a PR, or says "code review".
---

# Code Review

## When to Use
Use this skill when the user asks for a code review (including PR/file review), or mentions code review / reviewing changes.

## Review Workflow
1. Understand the context
   - Identify the feature/area touched and how it fits the existing system.
   - Note any missing context; ask targeted questions if needed.
2. Correctness & edge cases
   - Verify logic matches intent.
   - Check for off-by-one, null/undefined handling, boundary conditions, and error paths.
3. Security
   - Look for injection risks (SQL/NoSQL injection, command injection, path traversal).
   - Check authentication/authorization boundaries and sensitive data handling.
   - Review client-side risks like XSS if user-generated content is rendered.
4. Maintainability
   - Assess readability, naming, separation of concerns, and consistency with local patterns.
   - Flag overly complex functions or duplicated logic.
5. Performance & resource usage
   - Identify obvious inefficiencies (N+1 queries, unbounded loops, large in-memory operations).
6. Robustness
   - Ensure errors are handled appropriately and failure modes are clear.
   - Verify logging is actionable without leaking secrets.
7. Tests & documentation
   - Check whether there are missing/weak tests for the changed behavior.
   - Call out documentation gaps if they affect usage/maintenance.

## Output Format
Provide your response in this structure:

### 1) Critical Issues (must fix)
- File/path + what’s wrong + why it matters + suggested fix

### 2) Major Suggestions (should fix)
- File/path + recommendation + impact + suggested fix

### 3) Minor Notes (nice to have)
- Non-blocking improvements (style consistency, small refactors, clarity)

### 4) Questions / Assumptions
- Up to 3 targeted questions if something is ambiguous

## Notes
- Prefer concrete feedback: reference the exact file path and the relevant code location.
- If you suspect a bug, explain the failure scenario and how to reproduce it.
- Avoid generic advice; tie feedback to the specific code under review.

