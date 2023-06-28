from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(forms.Form):
    username = forms.CharField(min_length=3, max_length=30, required=True)
    password = forms.CharField(min_length=8, widget=forms.PasswordInput, required=True)
    email = forms.EmailField(required=True)