import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // 이메일 서비스 API로 데이터 전송 (예: SendGrid, Mailgun 등)
    const response = await fetch('https://api.emailservice.com/v1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAIL_SERVICE_API_KEY}`,
      },
      body: JSON.stringify({
        to: process.env.ADMIN_EMAIL,
        subject: `[PoseAI] 새로운 문의: ${subject}`,
        html: `
          <h2>새로운 문의가 접수되었습니다</h2>
          <p><strong>이름:</strong> ${name}</p>
          <p><strong>이메일:</strong> ${email}</p>
          <p><strong>연락처:</strong> ${phone}</p>
          <p><strong>문의 유형:</strong> ${subject}</p>
          <p><strong>문의 내용:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('이메일 전송에 실패했습니다');
    }

    // 문의 내용을 데이터베이스에 저장 (선택사항)
    await fetch('/api/db/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date().toISOString(),
      }),
    });

    return NextResponse.json({ message: '문의가 성공적으로 전송되었습니다' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: '문의 전송에 실패했습니다' },
      { status: 500 }
    );
  }
} 