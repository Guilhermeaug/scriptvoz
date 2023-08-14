'use client'

import { applyStudent } from "@/lib/group";

interface SubscribeButtonProps {
  groupId: number;
  userId: number;
}

export function SubscribeButton({ groupId, userId }: SubscribeButtonProps) {

  async function subscribeStudent() {
    await applyStudent({
      groupId: groupId,
      userId: userId,
    });
  }

  return (
    <button className='btn btn-secondary' onClick={subscribeStudent}>
      Clique para confirmar sua participação
    </button>
  );
}
