import axios from 'axios';

// レスポンスデータの型を定義します。
export interface ApiResponse {
  message: string;
  data?: any;
}

// サーバーエラー時のレスポンスデータ型を定義します。
export interface ServerErrorResponse {
  status: number;
  message: string;
  error?: any;
}

// カスタムリクエスト関数のオプションパラメーターの型を定義します。
interface RequestFunctionOptions {
  onSuccess: (data: ApiResponse) => void;              // 成功時の処理の関数
  onError: (error: any) => void;                       // クライアント側エラー時の処理の関数
  onServerError?: (serverError: ServerErrorResponse) => void; // サーバー側エラー時の処理の関数
}

// APIリクエスト関数の型を拡張します。
type ApiRequestFunction = (
  url: string,
  options: RequestFunctionOptions,
  params?: Record<string, any>
) => void;

let baseUrl = 'http://localhost:8000/'

// APIリクエスト関数の実装
export const fetchFromApi: ApiRequestFunction = async (url, options, params) => {
  try {
    const response = await axios.get(baseUrl+url, { params });

    if (response.status >= 200 && response.status < 300) {
      // HTTP ステータスコードが 2xx なら成功と見なす
      options.onSuccess(response.data);
    } else {
      // それ以外はサーバー側エラーと見なす
      options.onServerError?.({
        status: response.status,
        message: 'Server error occurred.',
        error: response.data
      });
    }
  } catch (error) {
    // ネットワークエラーなどのクライアント側エラー
    options.onError(error);
  }
};
/*
// 使用例:

// 成功時に呼ばれる関数
const handleSuccess = (data: ApiResponse) => {
  console.log('Request succeeded with data:', data);
  // 追加の成功時処理...
};

// クライアント側エラー時に呼ばれる関数
const handleError = (error: any) => {
  console.error('Request failed with client error:', error);
  // 追加のクライアント側エラー時処理...
};

// サーバー側エラー時に呼ばれる関数
const handleServerError = (serverError: ServerErrorResponse) => {
  console.error(
    `Request failed with server error: ${serverError.status} ${serverError.message}`,
    serverError.error
  );
  // 追加のサーバー側エラー時処理...
};

// リクエスト送信
fetchFromApi(
  'http://your-django-server.com/api/example',
  {
    onSuccess: handleSuccess,
    onError: handleError,
    onServerError: handleServerError // サーバー側エラー時のコールバック指定
  },
  {
    param1: 'value1',
    param2: 'value2'
  }
);
*/