import { NextResponse } from 'next/server';

import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, timeline, message, isPrivate } = body;

    // 필수 필드 검증
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          service,
          timeline: timeline || null,
          message,
          'isPrivate': isPrivate !== undefined ? isPrivate : false, // 기본값은 공개 (false = 공개, true = 비공개)
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

