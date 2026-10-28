# Contributing to Watson

Thanks for your interest in making Watson better!

## Ways to help

- **Report a bug** — open an issue with your OS, Watson version, and what you typed into the search field.
- **Suggest a source** — know a public site Watson should check? Tell us in an issue.
- **Improve the docs** — typo fixes and clearer wording are always welcome.
- **Submit a pull request** — fork, branch, commit, push, open the PR.

## Ground rules

1. Keep the UI in line with [DESIGN.md](DESIGN.md).
2. One feature or fix per pull request.
3. `npm run build` must pass with no TypeScript errors.
4. Don't add new dependencies without opening an issue first.

## Development quick start

```bash
npm install
npm run dev        # site at http://localhost:5173
npm run app         # desktop window (Electron)
npm run build       # production build into dist/
```

## License

By contributing, you agree that your contributions will be licensed under the
[MIT License](LICENSE).
