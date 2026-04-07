import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ✅ AKSK 在这里：process.env.ACCESS_KEY_ID（用户永远看不到）
  // ✅ AKSK 在这里：process.env.ACCESS_KEY_SECRET（用户永远看不到）

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只接受 POST 请求' })
  }

  const { name, message } = req.body

  // 这里是你未来的 API 调用逻辑
  // 例如：调用阿里云 PDF 生成服务
  // const result = await aliCloudPDF({ ...req.body })

  res.status(200).json({
    message: 'API 调用成功！',
    received: { name, message },
    // 演示用：显示当前环境变量是否存在（实际部署时会返回真实值）
    hasAKSK: !!(process.env.ACCESS_KEY_ID && process.env.ACCESS_KEY_SECRET)
  })
}
