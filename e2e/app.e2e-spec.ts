import { Angular4OfficalTutorialPage } from './app.po';

describe('angular4-offical-tutorial App', () => {
  let page: Angular4OfficalTutorialPage;

  beforeEach(() => {
    page = new Angular4OfficalTutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
