# movies-app-frontend
My MoviesApp frontend project for Advanced Web Technologies subject on master studies.

Uputstva za pokretanje aplikacije



* Potrebno je pripremiti bazu, pokrenuti serverski i klijentski deo.



DATABASE
 (MySQL)
- MySQL server (>=14.14)
 
- Na localhostu treba kreirati bazu podataka sa imenom "movies-app".
 
- Pokretanje backend aplikacije će inicijalizovati sve potrebne tabele u bazi.
 



BACKEND
 (Јаva Spring)
- Java (>=1.8)
 
- Apache Maven (>=3.3.9)
 
- Jedan način za pokretanje aplikacije je kroz neki IDE (ja koristim IntelliJ), pokretanjem AppRunner.java klase (klikom na "Run").
 
- Drugi način je da se unutar foldera nsi-backend, pokrenu sledeće komande za pokretanje backend aplikacije:
    
	- mvn clean install
    
	- mvn spring-boot:run

* Nakon pokretanja backend-a, iskopirati i izvršiti korake za popunjavanje baze test podacima iz fajla db-init.sql koji se nalazi u /resource folderu backend aplikacije.

FRONTEND
 (React JS & Ant design)
- Node.js (>=8.12)
 
- npm (>=6.4.1)
 
- Unutar foldera nsi-frontend, pokrenuti sledeće komande za preuzimanje node modula i pokretanje frontend aplikacije:
    
	- npm install
    
	- npm start



* Backend će se pokrenuti na portu 5000, a frontend na portu 3000.

* Otvoriti aplikaciju na putanji: 
http://localhost:3000
