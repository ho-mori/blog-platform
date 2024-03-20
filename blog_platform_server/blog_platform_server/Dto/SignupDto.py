from dataclasses import dataclass

@dataclass
class SignupDto:
    username: str
    email: str
    password: str