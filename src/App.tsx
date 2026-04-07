import { useState } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testApi = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '测试用户', message: '你好！' })
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setError('请求失败，请检查网络或本地开发服务器是否运行')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="toolbar">
        <h1>简历生成器 - CV Maker</h1>
        <span className="badge">Vercel 部署版</span>
      </header>

      <main className="container">
        <div className="info-card">
          <h2>架构说明</h2>
          <div className="architecture">
            <div className="layer frontend">
              <strong>前端</strong>
              <p>React + TypeScript + Vite</p>
              <span className="tag">用户可见（混淆后）</span>
            </div>
            <div className="arrow">↓</div>
            <div className="layer api">
              <strong>API 函数</strong>
              <p>/api/hello</p>
              <span className="tag">Serverless，保密</span>
            </div>
            <div className="arrow">↓</div>
            <div className="layer aksk">
              <strong>环境变量</strong>
              <p>AKSK 密钥</p>
              <span className="tag">完全保密，仅服务端可见</span>
            </div>
          </div>
        </div>

        <div className="test-card">
          <h2>测试 API 调用</h2>
          <p>点击下方按钮，测试前端 → API → 环境的调用链路</p>

          <button className="btn btn-primary" onClick={testApi} disabled={loading}>
            {loading ? '调用中...' : '发送测试请求'}
          </button>

          {error && <div className="error">{error}</div>}

          {result && (
            <div className="result">
              <h3>返回结果：</h3>
              <pre>{result}</pre>
            </div>
          )}
        </div>

        <div className="next-card">
          <h2>下一步</h2>
          <ol>
            <li>在 Vercel 后台配置你的 AKSK 环境变量</li>
            <li>编写真正的 API 函数（如调用阿里云 PDF 服务）</li>
            <li>迁移 CVmaker 的完整功能</li>
          </ol>
        </div>
      </main>
    </div>
  )
}

export default App
