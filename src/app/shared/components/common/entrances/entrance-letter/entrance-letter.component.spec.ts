import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { EntranceLetterComponent } from './entrance-letter.component';

describe('EntranceLetterComponent', () => {
  let fixture: ComponentFixture<EntranceLetterComponent>;
  let component: EntranceLetterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntranceLetterComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(EntranceLetterComponent);
    component = fixture.componentInstance;
    component.husbandName = 'Alex';
    component.wifeName = 'Sam';
  });

  it('stays sealed until the invitation is ready', () => {
    component.ready = false;
    fixture.detectChanges();

    component.open();

    expect(component.phase).toBe('sealed');
    expect(fixture.nativeElement.querySelector('.enter-button')).toBeNull();
  });

  it('opens the letter on click and emits the music choice', () => {
    component.ready = true;
    fixture.detectChanges();

    const opened = jasmine.createSpy('accept');
    component.accept.subscribe(opened);

    const opener = fixture.nativeElement.querySelector('.seal-button') as HTMLButtonElement;
    opener.click();
    fixture.detectChanges();

    expect(component.phase).toBe('open');
    expect(fixture.nativeElement.textContent).toContain('Sam');
    expect(fixture.nativeElement.textContent).toContain('Alex');
    expect(fixture.nativeElement.querySelector('.crest-frame')).not.toBeNull();

    const buttons = fixture.nativeElement.querySelectorAll('.enter-button') as NodeListOf<HTMLButtonElement>;
    buttons[0].click();
    buttons[1].click();

    expect(opened).toHaveBeenCalledWith(true);
    expect(opened).toHaveBeenCalledWith(false);
  });
});
