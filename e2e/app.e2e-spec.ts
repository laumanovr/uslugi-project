import { UslugaPage } from './app.po';

describe('usluga App', () => {
  let page: UslugaPage;

  beforeEach(() => {
    page = new UslugaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
