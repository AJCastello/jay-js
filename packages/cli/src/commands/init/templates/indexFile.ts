export function indexFile(projectName: string, ext: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="/jayjs.svg" />
    <title>Jay JS (${projectName})</title>
</head>
<body>
    <div id="app"></div>
    <script type="module" src="/src/main.${ext}"></script>
</body>
</html>`;
}
