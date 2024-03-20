from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .SignUpException import SignUpExceptionHandler

class CustomExceptionHandlerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except Exception as e:
            return self.process_exception(request, e)
        
        return response

    def process_exception(self, request, exception):
        if isinstance(exception, SignUpExceptionHandler):
            error_data = {'error': str(exception)}
            return JsonResponse(error_data, status=401)  # Unauthorized (認証失敗)

        # 例外に応じて適切なエラーレスポンスを返す
        error_data = {'error': 'An unexpected error occurred'}
        return JsonResponse(error_data, status=500)