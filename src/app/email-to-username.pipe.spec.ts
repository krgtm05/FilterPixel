import { EmailToUsernamePipe } from './email-to-username.pipe';

describe('EmailToUsernamePipe', () => {
  it('create an instance', () => {
    const pipe = new EmailToUsernamePipe();
    expect(pipe).toBeTruthy();
  });
});
