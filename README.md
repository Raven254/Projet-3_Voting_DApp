# **Projet 3 - DApp Voting**
## **Résumé**
L'objectif de ce projet est de réaliser une DApp à partir du contrat Voting.sol.  
Le front a été réalisé en React.   
+ [**Lien du site GitHub Pages**](https://xxxx)    // J'ai rencontré un bug à l'upload car non présence du dossier build malgré l'installation.
+ **Adresse du contrat Ropsten** : 0xb7E5066d03B8964E307ce8b9223Df7fE5B065FFf


## **Sécurité et Bonnes pratiques**

### **__Sécurité__** :
Cap de propositions au tableau proposalsArray limité à 1000 au total, pour parer aux attaques DOS sur la fonction tallyVOtes.
  

### **Bonnes pratiques** :
+ Ajout d'une fonction **Receive**.  
+ Ajout d'une fonction **Fallback**. 


## **Conclusion de l'exercice** :

Je n'ai pas réussi à rendre le code fonctionnel, en dehors de :
+ Montrer l'adresse du wallet utilisé.
+ Montrer la phase en cours.
+ Permettre à l'owner d'ajouter des électeurs.
+ Changer l'affichage en fonction du voter / owner.

J'ai eu plusieurs bugs qui m'ont fait perdre beaucoup de temps, dont un qui m'a empêché de passer des transactions car pas assez de gas.  
L'exercice m'a pris beaucoup de temps mais je ne l'ai malheureusement pas réussi. Il m'a cependant permis de mieux comprendre React et Web3.js.

[Vidéo Loom](https://www.loom.com/share/cf410d8551f64b6c8d30fbf8c813f630)
    
      

![Interface](./Interface%20.png)
