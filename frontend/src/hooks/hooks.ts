import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../constants/types/types';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useImageCaching } from './use-image-cache/use-image-cache';

export { useFormControl } from './use-form-control/use-form-control.hook';
export { useAppForm } from './use-app-form/use-app-form.hook';
export { useAppSelector, useAppDispatch };
