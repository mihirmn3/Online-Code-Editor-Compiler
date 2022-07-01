from django import forms
from tinymce import TinyMCE
from .models import richeditor


class TinyMCEWidget(TinyMCE):
    def use_required_attribute(self, *args):
        return False


class PostForm(forms.ModelForm):
    content = forms.CharField(
        widget=TinyMCEWidget(
            attrs={'required': False, 'cols': 50, 'rows': 100}
        )
    )

    class Meta:
        model = richeditor
        fields = '__all__'
