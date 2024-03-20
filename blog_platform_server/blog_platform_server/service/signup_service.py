from ..Dao.userDao import UserDao


def signup(userName, password, email):

    # UserDaoクラスのインスタンスを生成
    dao = UserDao()

    # ユーザー名が存在するかどうかを確認
    if dao.user_exists(userName):
        return False
    
    # メールアドレスが存在するかどうかを確認
    if dao.email_exists(email):
        return False
    
    # ユーザーを追加
    dao.insert(userName, password, email)
    return True