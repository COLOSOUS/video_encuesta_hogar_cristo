
import mysql.connector
from mysql.connector import pooling
import os

# Configuración de la base de datos
DB_HOST = os.getenv('DB_HOST', 'formulariohc.cl')
DB_USER = os.getenv('DB_USER', 'formula2_admin')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'formula2_rosario')
DB_NAME = os.getenv('DB_NAME', 'formula2_hc2')

# Crear el pool de conexiones
connection_pool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=10,
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)

# Función para probar la conexión
def test_connection():
    try:
        # Obtener una conexión del pool
        connection = connection_pool.get_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE();")
        result = cursor.fetchone()
        print("Conectado a la base de datos:", result[0])

        # Cerrar cursor y conexión
        cursor.close()
        connection.close()
    except mysql.connector.Error as err:
        print("Error al conectarse a la base de datos:", err)

# Ejecutar prueba
if __name__ == "__main__":
    test_connection()