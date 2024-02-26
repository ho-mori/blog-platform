from ..Dao.userDao import UserDao

def helloService(result):
    return result

def dbService(result):
    dao = UserDao()
    users = dao.get_all_users()
    return users

