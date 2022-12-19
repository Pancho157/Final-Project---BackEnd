# PROGRAMACIÓN BACKEND

# Comisión #32095

# 3er entrega del Proyecto Final

## Requisitos del proyecto:

---

1.  Tener instalado Node.js en la PC a ejecutar el proyecto

2.  Tener una cuenta de nodemailer y twilio

3.  Configurar un archivo .env con las siguientes variables:

        ENV = "prod" ó "dev"
        PERS = "mongodb" ó "firebase"
        MONGO_URL = (mongoDB Atlas connection url)
        
        FIREBASE_CONFIG = (Config ubicada debajo como JSON.Stringify)
            {
                type: (Dado por firebase),
                project_id: (Dado por firebase),
                private_key_id: (Dado por firebase),
                private_key: (Dado por firebase),
                client_email: (Dado por firebase),
                client_id: (Dado por firebase),
                auth_uri: (Dado por firebase),
                token_uri: (Dado por firebase),
                auth_provider_x509_cert_url: (Dado por firebase),
                client_x509_cert_url: (Dado por firebase)
            }

## Como instalar el proyecto:

---

1.  Configurar las variables de entorno

2.  Instalar las dependencias del proyecto

        yarn install

3.  Iniciar el servidor

        FORK: yarn start

        CLUSTER: yarn start (con variable de ambiente "CLUSTER = 'true'")
