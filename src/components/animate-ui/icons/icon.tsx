'use client';

import * as React from 'react';
import {
  useAnimation,
  type SVGMotionProps,
} from 'motion/react';

type AnimationControls = ReturnType<typeof useAnimation>;

type AnimateIconContextValue = {
  controls: AnimationControls | undefined;
};

const AnimateIconContext =
  React.createContext<AnimateIconContextValue>({ controls: undefined });

function useAnimateIconContext() {
  return React.useContext(AnimateIconContext);
}

function getVariants<T extends Record<string, unknown>>(
  animations: T,
  animate?: keyof T,
): T[keyof T] {
  const key = (animate ?? 'default') as keyof T;
  return animations[key] ?? animations['default' as keyof T];
}

type IconProps<TAnimate extends string = string> = Omit<
  SVGMotionProps<SVGSVGElement>,
  'animate'
> & {
  size?: number;
  animate?: TAnimate;
  animateOnHover?: boolean | TAnimate;
  animateOnTap?: boolean | TAnimate;
};

function IconWrapper<TAnimate extends string>({
  icon: IconComponent,
  size = 24,
  animate,
  animateOnHover = false,
  animateOnTap = false,
  ...rest
}: IconProps<TAnimate> & {
  icon: React.ComponentType<IconProps<TAnimate>>;
}) {
  const controls = useAnimation();

  // Controlled animation (e.g. morph to X while a menu is open).
  React.useEffect(() => {
    if (animate) {
      void controls.start('animate');
    } else {
      void controls.start('initial');
    }
  }, [animate, controls]);

  const variantKey =
    typeof animateOnHover === 'string'
      ? animateOnHover
      : typeof animateOnTap === 'string'
        ? animateOnTap
        : undefined;
  void variantKey;

  return (
    <AnimateIconContext.Provider value={{ controls }}>
      <span
        style={{ display: 'inline-flex', alignItems: 'center' }}
        onMouseEnter={
          animateOnHover
            ? () => void controls.start('animate')
            : undefined
        }
        onMouseLeave={
          animateOnHover && !animate
            ? () => void controls.start('initial')
            : undefined
        }
        onPointerDown={
          animateOnTap ? () => void controls.start('animate') : undefined
        }
        onPointerUp={
          animateOnTap && !animate
            ? () => void controls.start('initial')
            : undefined
        }
      >
        <IconComponent size={size} {...rest} />
      </span>
    </AnimateIconContext.Provider>
  );
}

export { getVariants, useAnimateIconContext, IconWrapper, type IconProps };
