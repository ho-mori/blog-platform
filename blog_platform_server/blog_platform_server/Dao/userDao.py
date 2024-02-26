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