import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const VERSION = packageJson.version;
const GITHUB_FOLDER = './github-release';
const CHANGELOG_FILE = path.join(GITHUB_FOLDER, 'CHANGELOG.md');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (q) => new Promise((resolve) => rl.question(q, resolve));

const run = (cmd, cwd = null, silent = false) => {
  try {
    if (!silent) console.log(`\n⚡ ${cmd}`);
    execSync(cmd, { stdio: silent ? 'pipe' : 'inherit', cwd: cwd });
    return true;
  } catch (error) {
    console.error(`❌ Erreur: ${cmd}`);
    return false;
  }
};

const fileExists = (filePath) => {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
};

const getDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const loadChangelog = () => {
  if (fs.existsSync(CHANGELOG_FILE)) {
    return fs.readFileSync(CHANGELOG_FILE, 'utf-8');
  }
  return `# 📋 Changelog

Historique des mises à jour de SurvevHack.

---

`;
};

const addChangelogEntry = (version, changes) => {
  const existingChangelog = loadChangelog();
  const date = getDate();

  const newEntry = `## 🚀 v${version} - ${date}

${changes.map(c => `- ${c}`).join('\n')}

---

`;

  const headerEnd = existingChangelog.indexOf('---') + 4;
  const header = existingChangelog.substring(0, headerEnd);
  const rest = existingChangelog.substring(headerEnd);

  return header + '\n' + newEntry + rest;
};

const askForChanges = async () => {
  console.log('\n📝 Quels changements dans cette version ?');
  console.log('   (Entre chaque changement, puis tape "done" pour terminer)\n');

  const changes = [];
  let i = 1;

  while (true) {
    const change = await question(`   ${i}. `);
    if (change.toLowerCase() === 'done' || change === '') {
      if (changes.length === 0) {
        changes.push('Corrections de bugs et améliorations');
      }
      break;
    }
    changes.push(change);
    i++;
  }

  return changes;
};

const deploy = async () => {
  console.log('');
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║  🚀 SurvevHack - Déploiement Automatique      ║');
  console.log('╚═══════════════════════════════════════════════╝');
  console.log('');
  console.log(`📦 Version actuelle: ${VERSION}`);
  console.log('');

  // Demander si on veut bump la version
  const bumpVersion = await question('🔄 Bump la version? (patch/minor/major/non) [non]: ');

  if (['patch', 'minor', 'major'].includes(bumpVersion.toLowerCase())) {
    console.log(`\n📝 Bump version: ${bumpVersion}`);
    run(`npm version ${bumpVersion} --no-git-tag-version`);

    const newPackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    console.log(`✅ Nouvelle version: ${newPackageJson.version}`);
  }

  // Relire la version
  const newVersion = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version;

  // Demander les changements pour le changelog
  const changes = await askForChanges();

  // Build
  console.log('\n📦 Build en cours...');
  if (!run('npm run build')) {
    console.log('❌ Build échoué!');
    rl.close();
    process.exit(1);
  }

  // Vérifier que les fichiers existent
  const files = [
    'dist/SurvevHack.user.js',
    'dist/SurvevHack-Extension.zip',
    'dist/version.txt'
  ];

  console.log('\n📁 Vérification des fichiers...');
  for (const file of files) {
    if (fileExists(file)) {
      console.log(`  ✅ ${file}`);
    } else {
      console.log(`  ❌ ${file} manquant!`);
      rl.close();
      process.exit(1);
    }
  }

  // Créer/nettoyer le dossier github-release
  console.log('\n📁 Préparation du dossier GitHub...');
  if (fs.existsSync(GITHUB_FOLDER)) {
    const gitFolder = path.join(GITHUB_FOLDER, '.git');
    const hasGit = fs.existsSync(gitFolder);

    if (hasGit) {
      // Supprimer tout sauf .git et CHANGELOG.md
      const filesToKeep = ['.git', 'CHANGELOG.md'];
      const folderFiles = fs.readdirSync(GITHUB_FOLDER);
      for (const file of folderFiles) {
        if (!filesToKeep.includes(file)) {
          fs.rmSync(path.join(GITHUB_FOLDER, file), { recursive: true, force: true });
        }
      }
    } else {
      fs.rmSync(GITHUB_FOLDER, { recursive: true, force: true });
      fs.mkdirSync(GITHUB_FOLDER);
    }
  } else {
    fs.mkdirSync(GITHUB_FOLDER);
  }

  // Copier les fichiers de distribution
  console.log('\n📋 Copie des fichiers pour GitHub...');
  fs.copyFileSync('dist/SurvevHack.user.js', path.join(GITHUB_FOLDER, 'SurvevHack.user.js'));
  fs.copyFileSync('dist/SurvevHack-Extension.zip', path.join(GITHUB_FOLDER, 'SurvevHack-Extension.zip'));
  fs.copyFileSync('dist/version.txt', path.join(GITHUB_FOLDER, 'version.txt'));
  console.log('  ✅ SurvevHack.user.js');
  console.log('  ✅ SurvevHack-Extension.zip');
  console.log('  ✅ version.txt');

  // Mettre à jour le changelog
  console.log('\n📝 Mise à jour du changelog...');
  const updatedChangelog = addChangelogEntry(newVersion, changes);
  fs.writeFileSync(CHANGELOG_FILE, updatedChangelog);
  console.log('  ✅ CHANGELOG.md mis à jour');

  // Créer/mettre à jour README.md
  const readme = `# SurvevHack 🎮

A powerful cheat for survev.io & more

**Version: ${newVersion}** | [📋 Changelog](./CHANGELOG.md)

## 📥 Installation (Tampermonkey)

1. Installe [Tampermonkey](https://www.tampermonkey.net/) sur ton navigateur
2. Clique sur [\`SurvevHack.user.js\`](./SurvevHack.user.js) puis sur **Raw**
3. Clique sur **Installer**
4. Va sur [survev.io](https://survev.io) et joue ! 🎮

## 📥 Installation (Extension Chrome)

1. Télécharge \`SurvevHack-Extension.zip\`
2. Va dans \`chrome://extensions/\`
3. Active le **Mode développeur**
4. Glisse le fichier \`.zip\` dans la page
5. C'est prêt !

## ⌨️ Raccourcis

| Touche | Action |
|--------|--------|
| \`Shift Droit\` | Ouvrir/Fermer le menu |
| \`B\` | Aimbot ON/OFF |
| \`N\` | Sticky Target ON/OFF |
| \`T\` | Layer Spoofer ON/OFF |

## ✨ Features

- 🎯 Aimbot
- 👁️ ESP (voir les joueurs)
- 🔫 Auto Fire
- 🔄 Auto Switch
- 🔫 Weapon Switch (personnalisable)
- 📦 Auto Loot
- 🔍 X-Ray (voir à travers les murs)
- 🔭 Infinite Zoom
- 💣 Grenade Timer

## 🆕 Dernière mise à jour

${changes.map(c => `- ${c}`).join('\n')}

---

**© 2025 SurvevHack**
`;
  fs.writeFileSync(path.join(GITHUB_FOLDER, 'README.md'), readme);
  console.log('  ✅ README.md');

  // Init git si nécessaire
  const gitFolder = path.join(GITHUB_FOLDER, '.git');
  if (!fs.existsSync(gitFolder)) {
    console.log('\n🔧 Initialisation Git...');
    run('git init', GITHUB_FOLDER);
    run('git remote add origin https://github.com/survevhack/SurvevHack.git', GITHUB_FOLDER);
    run('git branch -M main', GITHUB_FOLDER);
  }

  // Commit et push
  const defaultMsg = `Release v${newVersion} - ${changes[0]}`;
  const commitMsg = await question(`\n💬 Message de commit [${defaultMsg}]: `);
  const finalMsg = commitMsg.trim() || defaultMsg;

  console.log('\n📤 Push sur GitHub...');
  run('git add .', GITHUB_FOLDER);
  run(`git commit -m "${finalMsg}"`, GITHUB_FOLDER);
  run('git push -u origin main --force', GITHUB_FOLDER);

  console.log('');
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║  ✅ Déploiement terminé avec succès!          ║');
  console.log('╠═══════════════════════════════════════════════╣');
  console.log(`║  📦 Version: ${newVersion.padEnd(33)}║`);
  console.log('║  📋 Changelog mis à jour                      ║');
  console.log('║  🌐 GitHub mis à jour                         ║');
  console.log('║  🔒 Code source: PRIVÉ (non uploadé)          ║');
  console.log('╚═══════════════════════════════════════════════╝');
  console.log('');

  rl.close();
};

deploy().catch((err) => {
  console.error('Erreur:', err);
  rl.close();
  process.exit(1);
});