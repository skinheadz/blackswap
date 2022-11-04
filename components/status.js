// import { Web3ReactHooks } from '@web3-react/core'

export default function Status({
  isActivating,
  isActive,
  error,
}) {
  return (
    <div>
      {error ? (
        <>
          🔴 {error.name ?? 'Error'}
          {error.message ? `: ${error.message}` : null}
        </>
      ) : isActivating ? (
        <>🟡 </>
      ) : isActive ? (
        <>🟢 </>
      ) : (
        <>⚪️ </>
      )}
    </div>
  )
}