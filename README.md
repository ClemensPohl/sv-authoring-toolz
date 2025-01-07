# AuthoringToolz

AuthoringToolz is a tool to create and edit JSON files for the AuthoringToolz project.

## How to use

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open the app in your browser

## Features

- 📝 Create and edit JSON files with an intuitive user interface
- 📚 Manage educational content with chapters and resources
- 🎥 Support for video content with synchronized side texts
- 📱 Responsive design for desktop and mobile use
- 💾 Easy JSON import and export functionality

## Project Structure

```
authoring-toolz/
├── src/
│   ├── routes/          # SvelteKit routes
│   ├── components/      # Reusable components
│   └── app.css         # Global styles
├── static/             # Static assets
└── package.json       # Project dependencies
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## Authors

- Clemens
- Manuel
- Lucas
- Tobias

## License

This project is licensed under the MIT License - see the LICENSE file for details.
