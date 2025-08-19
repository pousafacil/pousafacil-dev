import requests

payload = {"email": "guest@hotel.com", "password": "secret123"}
r = requests.post('http://localhost:8080/auth/register', json=payload)
print(r.status_code, r.text)

r2 = requests.post('http://localhost:8080/auth/login', json=payload)
print('login:', r2.status_code, r2.text)

if r2.ok:
    token = r2.json().get('access_token')
    h = {"Authorization": f"Bearer {token}"}
    b = {"room_number": "101", "check_in": "2025-09-01", "check_out": "2025-09-03"}
    rb = requests.post('http://localhost:8080/bookings', json=b, headers=h)
    print('create booking:', rb.status_code, rb.text)
    lb = requests.get('http://localhost:8080/bookings', headers=h)
    print('list bookings:', lb.status_code, lb.text)
import requests

payload = {"email": "guest@hotel.com", "password": "secret123"}
r = requests.post('http://localhost:8080/auth/register', json=payload)
print(r.status_code, r.text)

r2 = requests.post('http://localhost:8080/auth/login', json=payload)
print('login:', r2.status_code, r2.text)

if r2.ok:
    token = r2.json().get('access_token')
    h = {"Authorization": f"Bearer {token}"}
    b = {"room_number": "101", "check_in": "2025-09-01", "check_out": "2025-09-03"}
    rb = requests.post('http://localhost:8080/bookings', json=b, headers=h)
    print('create booking:', rb.status_code, rb.text)
    lb = requests.get('http://localhost:8080/bookings', headers=h)
    print('list bookings:', lb.status_code, lb.text)
