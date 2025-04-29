# Projet Hackathon - Détection d'Objets avec React et TensorFlow.js

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22.0-FF6F00?logo=tensorflow)
![Netlify](https://img.shields.io/badge/Netlify-deployed-success)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Présentation

Ce projet a été développé lors d'un hackathon de 2 jours dans le cadre de notre formation de développeur web et mobile à SIELI. Il s'agit d'une application web permettant la détection d'objets en temps réel grâce à TensorFlow.js et au modèle COCO-SSD (Single Shot MultiBox Detection).

## 📸 Démonstration

[Démonstration du projet](https://jopadofficiel-hackathon-react-tensorf.netlify.app/)

## 🔍 Fonctionnalités

- **Détection d'objets en temps réel** via webcam
- **Affichage des prédictions** avec cadres de délimitation (bounding boxes)
- **Liste des objets détectés** en temps réel
- **Sauvegarde et exportation** des détections (format CSV)
- **Interface responsive** adaptée pour mobile et desktop
- **Thème clair/sombre** pour une meilleure expérience utilisateur
- **Optimisation des performances** pour une détection fluide
- **Galerie d'images** avec possibilité de téléchargement et suppression

## 🧰 Technologies utilisées

- **Frontend**:

  - React 19.0.0
  - Vite 6.3.1
  - Bootstrap 5.3.5
  - React Bootstrap 2.10.9

- **IA & ML**:

  - TensorFlow.js 4.22.0
  - COCO-SSD 2.2.3 (modèle pré-entraîné)

- **Outils de développement**:
  - ESLint 9.25.1
  - Prettier 3.5.3
  - React Webcam 7.2.0
  - React Icons 5.5.0

## 📊 Organisation du projet

Nous avons utilisé la méthodologie Agile avec un tableau Kanban pour organiser notre travail :

![Tableau Kanban](/public/tableau-kanban.png)

Notre workflow de développement a été structuré comme suit :

1. Création d'une branche par fonctionnalité
2. Développement et tests locaux
3. Soumission de Pull Requests
4. Revue de code par les membres de l'équipe
5. Merge dans la branche `dev` pour les tests
6. Merge final dans la branche `main` pour la production

## 🚀 Installation et démarrage

### Prérequis

- Node.js (v18.0.0 ou supérieur)
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/JoPadOfficiel/Hackathon-React-TensorFlow.js.git

# Accéder au dossier du projet
cd Hackathon-React-TensorFlow.js

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:5173](http://localhost:5173).

### Commandes disponibles

```bash
# Lancer en mode développement
npm run dev

# Construire pour la production
npm run build

# Déployer sur Netlify
npm run deploy

# Linter
npm run lint

# Corriger les problèmes de linting
npm run lint:fix

# Formater le code
npm run format
```

## 📂 Structure du projet

```
├── public/               # Fichiers statiques
├── src/                  # Code source
│   ├── assets/           # Images et autres ressources
│   ├── components/       # Composants React
│   │   ├── DetectionList.jsx    # Liste des détections
│   │   └── webcamView.jsx       # Affichage webcam et détection
│   ├── styles/           # Fichiers CSS/SCSS
│   ├── utils/            # Utilitaires
│   │   ├── objectDetection.js   # Logique de détection
│   │   └── localstorageSave.js  # Sauvegarde locale
│   ├── App.jsx           # Composant principal
│   └── main.jsx          # Point d'entrée
└── package.json          # Dépendances et scripts
```

## 👥 Contributeurs

Ce projet a été réalisé par une équipe de 5 développeurs de la formation:

- [JoPad (Jopad Officiel)](https://github.com/JoPadOfficiel)
- [Célia S.](https://github.com/CelooSa)
- [Younes Benaoumeur](https://github.com/Hidarime)
- [Emilien](https://github.com/emilien8-von)
- [Brahim](https://github.com/HIMRA01)

## 📄 Licence

Ce projet est open source et disponible sous licence MIT.

## 🔗 Ressources utiles

- [Documentation TensorFlow.js](https://www.tensorflow.org/js/tutorials)
- [Modèle COCO-SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)
- [React Documentation](https://react.dev/learn)
- [Vite Documentation](https://vitejs.dev/guide/)
