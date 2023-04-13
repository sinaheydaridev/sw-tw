from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from users import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('set-csrf-token/', views.set_csrf_token),
    path('account/login/', views.AccountLogin.as_view(), name='account-login'),
    path('account/signup/', views.AccountSignUp.as_view(), name='account-signup'),
    path('account/signup/google/', views.AccountGoogleSignup.as_view(), name='account-google-signup'),
    path('account/login/google/', views.AccountGoogleLogin.as_view(), name='account-google-login'),
    path('account/state/', views.AccountState.as_view(), name='account-state'),
    path('account/send-verify-email/', views.AccountSendVerifyEmail.as_view(), name='account-send-verify-email'),
    path('account/edit/', views.AccountEditProfile.as_view(), name='account-edit-profile'),
    path('account/change-password/', views.AccountChangePassword.as_view(), name='account-change-password'),
    path('account/send-reset-password-link/', views.AccountSendResetPassword.as_view(), name='account-send-reset-password-link'),
    path('account/reset-password/<uidb64>/<token>/', views.AccountResetPassword.as_view(), name='reset-password'),
    path('account/logout/', views.AccountLogout.as_view(), name='reset-password'),
    # path('token/refresh/', TokenRefreshView.as_view()),
    # path('token/', TokenObtainPairView.as_view()),
]
