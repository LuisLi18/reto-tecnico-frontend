import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
    ShoppingCartOutline, 
    PlusOutline,
    DownOutline,
    EditOutline,
    DeleteOutline,
    SearchOutline,
    QuestionCircleOutline,
    BellOutline,
    UpOutline,
    DownloadOutline,
    BellFill,
    QuestionCircleFill,
    ShoppingFill
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
    ShoppingCartOutline, 
    PlusOutline,
    DownOutline,
    EditOutline,
    DeleteOutline,
    SearchOutline,
    QuestionCircleOutline,
    BellOutline,
    UpOutline,
    DownloadOutline,
    BellFill,
    QuestionCircleFill,
    ShoppingFill
];

export function provideNzIcons(): EnvironmentProviders {
  return importProvidersFrom(NzIconModule.forRoot(icons));
}