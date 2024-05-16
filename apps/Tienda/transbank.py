import json
from django.conf import settings
from django.http import JsonResponse
import requests
from django.views.decorators.csrf import csrf_exempt
import random

def crear_transaccion(buy_order, session_id, amount, return_url):
    url = settings.TRANSBANK_BASE_URL + 'transactions'
    headers = {
        'Tbk-Api-Key-Id': settings.TRANSBANK_COMMERCE_CODE,
        'Tbk-Api-Key-Secret': settings.TRANSBANK_API_KEY,
        'Content-Type': 'application/json'
    }
    data = {
        'buy_order': buy_order,
        'session_id': session_id,
        'amount': amount,
        'return_url': return_url
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json()

def confirmar_transaccion(token):
    url = settings.TRANSBANK_BASE_URL + f'transactions/{token}'
    headers = {
        'Tbk-Api-Key-Id': settings.TRANSBANK_COMMERCE_CODE,
        'Tbk-Api-Key-Secret': settings.TRANSBANK_API_KEY,
        'Content-Type': 'application/json'
    }
    response = requests.put(url, headers=headers)
    return response.json()