# intraconnect - Le réseau social d'entreprise

intraconnect est un réseau social interne d'entreprise conçu pour faciliter les interactions entre les employés dans un environnement informel. Cette plateforme offre plusieurs fonctionnalités clés pour favoriser la communication et la collaboration au sein de l'organisation.

## Fonctionnalités

1. **Page de connexion**

- Permet aux utilisateurs de se connecter à leur compte existant ou de créer un nouveau compte en fournissant leur adresse e-mail et un mot de passe sécurisé.
- La session de l'utilisateur persiste tant qu'il est connecté.

2. **Page d'accueil**

- Affiche une liste des publications créées par les utilisateurs, organisées de manière antéchronologique pour mettre en avant les publications les plus récentes.

3. **Création d'un post**

- Les utilisateurs peuvent créer des publications contenant du texte et des images.
- Ils ont également la possibilité de modifier ou supprimer leurs propres publications.

4. **Système de like et dislike**

- Permet aux utilisateurs d'exprimer leur appréciation pour les publications en les likant.
- Les utilisateurs peuvent également exprimer leur désapprobation en dislikant les publications.
- Chaque utilisateur peut liker ou disliker un post une seule fois.

5. **Rôle administrateur**

- Un utilisateur administrateur possède des droits de modération étendus, notamment la possibilité de modifier ou supprimer toutes les publications sur le réseau social.
- Les identifiants de l'administrateur seront communiqués pour faciliter la gestion de la plateforme.

## Technologies Utilisées

- **Frontend** : TypeScript, Next.js, Tailwind CSS
- **Backend** : Next.js, Prisma, MySQL

## Installation

Pour installer et exécuter localement Learn@Home, suivez ces étapes :

1. Clonez ce dépôt sur votre machine locale.
2. Assurez-vous d'avoir Node.js et MySQL installés sur votre système.
3. Exécutez `npm install` dans le répertoire racine pour installer les dépendances.
4. Configurez les variables d'environnement nécessaires, telles que les clés d'API et les paramètres de connexion à la base de données.
5. Exécutez `npm run dev` pour démarrer l'application en mode développement.
