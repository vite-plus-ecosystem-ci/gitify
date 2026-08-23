import type React from 'react';
import { createElement, useState } from 'react';

import { Avatar, Stack, Truncate } from '@primer/react';

import { type Link, Size, type UserType } from '../../types';

import { isNonHumanUser } from '../../utils/notifications/filters/userType';
import { getDefaultUserIcon } from '../../utils/ui/icons';

export interface AvatarWithFallbackProps {
  src?: Link;
  alt?: string;
  name?: string;
  size?: number;
  userType?: UserType;
}

export const AvatarWithFallback: React.FC<AvatarWithFallbackProps> = ({
  src,
  alt,
  name,
  size = Size.MEDIUM,
  userType = 'User',
}) => {
  const [hasBrokenAvatarSource, setHasBrokenAvatarSource] = useState(false);

  const isNonHuman = isNonHumanUser(userType);
  // `getDefaultUserIcon` returns one of a few module-level icon components, so
  // this is a lookup rather than a component defined during render. Rendering it
  // through `createElement` keeps that clear to `react/static-components`.
  const defaultUserIcon = getDefaultUserIcon(userType);

  // TODO explore using AnchoredOverlay component (https://primer.style/components/anchored-overlay/react/alpha) to render Avatar Card on hover
  return (
    <Stack align="center" data-testid="avatar" direction="horizontal" gap="condensed">
      {!src || hasBrokenAvatarSource ? (
        createElement(defaultUserIcon, { size })
      ) : (
        <Avatar
          alt={alt}
          onError={() => setHasBrokenAvatarSource(true)}
          size={size}
          square={isNonHuman}
          src={src}
        />
      )}
      {name && (
        <Truncate inline maxWidth={280} title={name}>
          {name}
        </Truncate>
      )}
    </Stack>
  );
};
