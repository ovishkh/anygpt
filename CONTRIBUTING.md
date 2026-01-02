# Contributing to AnyGPT

Welcome! We're excited that you're interested in contributing to AnyGPT.

## 🛠️ Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/anygpt.git
    cd anygpt
    ```
3.  **Install dependencies**:
    ```bash
    make install
    ```
4.  **Set up environment variables**:
    Copy `.env.example` to `.env` and fill in your API keys and database URL.
    ```bash
    cp .env.example .env
    ```
5.  **Run the development server**:
    ```bash
    make dev
    ```

## 📜 Development Guidelines

-   **Code Style**: We use ESLint and Prettier. Run `make lint` before committing.
-   **Branching**: Create a feature branch for your changes: `git checkout -b feature/your-feature-name`.
-   **Commits**: Use descriptive commit messages (e.g., `feat: add new provider`, `fix: sidebar layout`).
-   **Testing**: Ensure that your changes don't break existing functionality.

## 📬 Pull Request Process

1.  Push your changes to your fork.
2.  Open a Pull Request (PR) against the `main` branch of the original repository.
3.  Provide a clear description of your changes and any relevant screenshots or recordings.
4.  Once your PR is reviewed and approved, it will be merged!

## ⚖️ License

By contributing to AnyGPT, you agree that your contributions will be licensed under the [MIT License](LICENSE).
