# Memory

## Principe de l'architecture du projet

### Architecture des dossiers

`/scripts` contient l'intégralité des scripts js
    | 
    |__`/account` gestion des comptes (connexion, déconnexion, inscription, affichage dynamique selon état connexion)
    |
    |__`/header` gestion du header
    | 
    |__`/utils` fonctions réutilisables (calcul d'age, gestion de regex, etc...)
    |
    |__`global.js` gestion du onepage (chargement d'assets, changement de comportement des liens etc...)

### Principe du projet

Le projet a pour but d'essayer reproduire un framework JS (Angular par exemple) sur la gestion de composants sans changer de page 
L'utilisateur reste (pour le moment) sur l'URL `/base.html` et chaque lien charge dynamiquement du contenu qui sera implémenté dans la div avec l'id `content` 


## Optimisations possibles

Pour optimiser la navigation voici une liste non-exhaustive des améliorations possibles:
    - Gestion des raccourcis "Précédent", "Suivant" des navigateurs
    - Gestion complexe de l'url: 
        - Changer l'url mais rester sur la même page
        - Permettre l'utilisation de parametre get