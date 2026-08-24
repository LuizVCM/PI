## variáveis ​​de ambiente

DB_HOST=localhost

DB_NAME=terrafarr

DB_USER=root

DB_PASSWORD=root

DB_PORT=3306

PORT = 3000

// crie uma senha aleatoria criptografada com:

terminal bash
```bash
openssl rand -base64 32
```
ou, no powershell / cmd / bash

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

JWT_SECRET=suasenhaaqui

JWT_EXPIRES_IN=86400

// use senhas diferentes

ADMIN_TOKEN=suasenhaaqui