import hashlib
from django.db import connection
from ..model.usersModel import UserModel

class UserDao:
    def get_all_users(self):
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT userid, username, email, passwordhash, createdat, updatedat
                FROM users
            """)
            rows = cursor.fetchall()
            
        users = []
        for row in rows:
            user = UserModel(
                userid=row[0],
                username=row[1],
                email=row[2],
                passwordhash=row[3],
                createdat=row[4],
                updatedat=row[5]
            )
            users.append(user)
        
        return users
    
    # ユーザーが存在するかどうかを確認する
    def user_exists(self, user: str):
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT userid
                FROM users
                WHERE username = %s
            """, [user])
            row = cursor.fetchone()
        
        return row is not None
    
    # メールアドレスが存在するかどうかを確認する
    def email_exists(self, email: str):
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT userid
                FROM users
                WHERE email = %s
            """, [email])
            row = cursor.fetchone()
        
        return row is not None

    # ユーザーを追加する
    def insert(self, user: str, password: str, email: str):
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO users (username, email, passwordhash)
                VALUES (%s, %s, %s)
            """, [user, email, hashlib.sha256(password.encode()).digest()])
        
        return cursor.lastrowid