describe('이벤트 업데이트 유틸리티 테스트', () => {
  it('이벤트의 반복 설정을 업데이트한다', () => {
    const event = createTestEvent('정기 회의', 'weekly');
    const updatedEvent = updateEventRepeat(event, { type: 'none', interval: 1 });
    expect(updatedEvent.repeat.type).toBe('none');
  });
});
