import setupStartingFiles, { Args } from "../setupStartingFiles"

const initialSetup: Args = {
  template: 'vite',
  files: {
    '/index.html': {
      code: '<div id="root"></div>'
    },
    '/package.json': {
      code: JSON.stringify({
        name: 'test',
        version: '1.0.0',
        dependencies: {
          'react': '^17.0.2',
        },
        devDependencies: {
          'react-dom': '^17.0.2',
        }
      })
    }
  },
  customSetup: {
    dependencies: {
      'vite': '^2.4.4',
    },
    devDependencies: {
      'vitest': '^2.4.4',
    }
  }
}

describe('setupStartingFiles', () => {
  it('should return a SandboxSetup object', () => {
    const res = setupStartingFiles(initialSetup)

    expect(res.files['/index.html']).toHaveProperty('code', '<div id="root"></div>');
    expect(res.files['/styles.css'].code).toMatch(/body {/);
    const packageJson = JSON.parse(res.files['/package.json'].code);

    expect(packageJson.dependencies).toHaveProperty('react', '^17.0.2');
    expect(packageJson.dependencies).toHaveProperty('vite', '^2.4.4');
    expect(packageJson.devDependencies).toHaveProperty('react-dom', '^17.0.2');
    expect(packageJson.devDependencies).toHaveProperty('vitest', '^2.4.4');
  })
})