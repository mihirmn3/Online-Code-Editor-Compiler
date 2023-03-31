from django.shortcuts import redirect, render
from django.http import HttpRequest
from .models import richeditor
import os
# Create your views here.


def index(request: HttpRequest):
    p = richeditor.objects.all()
    x = ""
    y = ""
    context = {}
    if request.method == 'POST':
        x = request.POST.get('codetext')
        y = request.POST.get('inputtext')
        z = request.POST.get('lang')
        xx = compile(x, y, z)
        if(len(p) > 0):
            context = {'p': x, 'plist': p, 'pname': p[len(p)-1].name, 'i': y, 'o': xx}
        else:
            print("yes")
            context = {'p': x, 'plist': '', 'i': y, 'o': xx}
    else:
        if(len(p) > 0):
            context = {'p': p[len(p)-1].para, 'pname': p[len(p)-1].name, 'plist': p, 'i': y, 'o': x}
        else:
            context = {'p': '', 'plist': '', 'i': y, 'o': x}
    return render(request, 'taskeditor/home.html', context)


def compile(code, inp, lang):
    fi = open('input.txt', 'w')
    fi.writelines(inp)
    fi.close()
    print(lang)
    if lang == "python":
        os.system("python3 pyyfile.py < input.txt > output.txt")
        f = open('pyyfile.py', 'w')
        f.writelines(code)
        f.close()
    elif lang == "cpp":
        f = open('code.cpp', 'w')
        f.writelines(code)
        f.close()
        os.system("g++ code.cpp -o oput")
        print("yes")
        os.system("./oput < input.txt > output.txt")
    else:
        return "Invalid language"
    op = ""
    f = open('output.txt', 'r')
    lst = f.readlines()
    for a in lst:
        op += a
    return op


def submit(request: HttpRequest):
    if request.method == 'POST':
        x = request.FILES['upload'].read()
        z = request.FILES['upload'].name
        y = richeditor()
        x = str(x)
        x = x[2:-1:]
        x = x.split('\\r\\n')
        x = '\n'.join(x)
        y.para = x
        y.name = z
        y.save()
        return redirect('/editor/')


def savecode(request: HttpRequest):
    if request.method == 'POST':
        x = request.POST.get('code')
        z = request.POST.get('codename')
        q = richeditor.objects.all().filter(name__startswith=z, name__endswith=z)
        if len(q) > 0:
            richeditor.objects.all().filter(name__startswith=z, name__endswith=z).delete()
        y = richeditor()
        y.para = x
        y.name = z
        y.save()
        return redirect('/editor/')


def loadcode(request: HttpRequest):
    if request.method == 'POST':
        x = request.POST.get('code_name')
        x = richeditor.objects.filter(name__startswith=x, name__endswith=x)
        x = x[0]
        richeditor.objects.filter(
            name__startswith=x.name, name__endswith=x.name).delete()
        richeditor.objects.create(name=x.name, para=x.para)
        return redirect('/editor/')
