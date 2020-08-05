import { Component, OnInit, Input } from '@angular/core';

const i = 0;
@Component({
  selector: 'goa-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class GoAButtonComponent implements OnInit {
  /**
   * Text to display in the button
   */
  @Input() title: string;

  /**
   * The tooltip and describedby description of the button.
   */
  @Input() description: string = null;

  /**
   * The appearance style of the button.
   */
  @Input() buttonType: 'primary' | 'secondary' | 'tertiary' = 'primary';

  constructor() {}

  ngOnInit() {}
}
