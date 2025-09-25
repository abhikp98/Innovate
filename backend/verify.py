def generate_otp():
    import random
    print("Generating OTP...")
    return str(random.randint(100000, 999999))